/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

export default function ({ loadTestFile }) {
  describe('Collection', () => {
    loadTestFile(require.resolve('./kibana'));
    // loadTestFile(require.resolve('./kibana_mb'));
    loadTestFile(require.resolve('./kibana_exclusive'));
    // loadTestFile(require.resolve('./kibana_exclusive_mb'));
    loadTestFile(require.resolve('./es_and_kibana'));
    // loadTestFile(require.resolve('./es_and_kibana_mb'));
    loadTestFile(require.resolve('./es_and_kibana_exclusive'));
    // loadTestFile(require.resolve('./es_and_kibana_exclusive_mb'));
    loadTestFile(require.resolve('./detect_beats'));
    loadTestFile(require.resolve('./detect_beats_management'));
    loadTestFile(require.resolve('./detect_logstash'));
    loadTestFile(require.resolve('./detect_logstash_management'));
    loadTestFile(require.resolve('./detect_apm'));
    loadTestFile(require.resolve('./security'));
    loadTestFile(require.resolve('./ccs'));
  });
}
