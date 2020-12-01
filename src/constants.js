exports.constants = {
  env: {
    list: ['DEVELOPMENT', 'STAGE', 'PRODUCTION'],
    textGrabber: {
      path: './node_modules/@oraclecc/dcu/src/textSnippetGrabber.js',
      search: /return textSnippetEndpoint/g,
      replace: 'return (localeName != "pt_BR") && textSnippetEndpoint'
    }
  },
  endpoint: {
    login: '/login',
    sse_list: '/serverExtensions',
    sse_upload: '/serverExtensions',
  },
  dcu: {
    paths: {
      src: './widgets',
      sse: './sse',
      dcu: './DesignCodeUtility/dcuIndex.js',
      ccw: './DesignCodeUtility/ccwIndex.js',
    }
  }
}
