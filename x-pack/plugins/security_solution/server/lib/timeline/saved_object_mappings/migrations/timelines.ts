/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import {
  SavedObjectMigrationMap,
  SavedObjectReference,
  SavedObjectSanitizedDoc,
  SavedObjectUnsanitizedDoc,
} from 'kibana/server';
import { flow } from 'lodash';
import { SAVED_QUERY_ID_REF_NAME, SAVED_QUERY_TYPE } from '../../constants';
import { createMigratedDoc, createReference } from './utils';
import { defaultDataViewRef } from '../../../../../common/constants';

export interface SavedQueryId {
  savedQueryId?: string | null;
}

export const migrateSavedQueryIdToReferences = (
  doc: SavedObjectUnsanitizedDoc<SavedQueryId>
): SavedObjectSanitizedDoc<unknown> => {
  const { savedQueryId, ...restAttributes } = doc.attributes;

  const { references: docReferences = [] } = doc;
  const savedQueryIdReferences = createReference(
    savedQueryId,
    SAVED_QUERY_ID_REF_NAME,
    SAVED_QUERY_TYPE
  );

  return createMigratedDoc({
    doc,
    attributes: restAttributes,
    docReferences,
    migratedReferences: savedQueryIdReferences,
  });
};

export const migrateDataViewIdToReferences = (
  doc: SavedObjectUnsanitizedDoc<unknown>
): SavedObjectSanitizedDoc<unknown> => {
  let foundDataView = false;
  const references: SavedObjectReference[] = (doc.references || []).map((t) => {
    // this is very unlikely to be set, but if it is we need to overwrite
    // to have correct indexNames association
    if (t.type === defaultDataViewRef.type) {
      foundDataView = true;
      return defaultDataViewRef;
    }
    return t;
  });
  if (!foundDataView) {
    references.push(defaultDataViewRef);
  }
  return {
    ...doc,
    references,
  };
};

export const timelinesMigrations: SavedObjectMigrationMap = {
  '7.16.0': flow(migrateSavedQueryIdToReferences, migrateDataViewIdToReferences),
};
