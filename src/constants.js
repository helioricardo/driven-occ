exports.constants = {
  env: {
    list: ['DEVELOPMENT', 'STAGE', 'PRODUCTION'],
    textGrabber: {
      path: './node_modules/@oraclecc/dcu/src/textSnippetGrabber.js',
      search: /return textSnippetEndpoint/g,
      replace: 'return (localeName != "pt_BR") && textSnippetEndpoint'
    }
  },
  dcu: {
    paths: {
      src: './widgets',
      dcu: './DesignCodeUtility/dcuIndex.js',
      ccw: './DesignCodeUtility/ccwIndex.js',
    }
  }
}
