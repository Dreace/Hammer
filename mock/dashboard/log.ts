export default {
  'GET /api/dashboard/log': {
    code: 0,
    data: [
      {
        level: 'INFO',
        message:
          '218.26.54.1 200 "GET /v2/notice/GetNewNotice?ts=1588815859784&key=09831afcb002c88ef42d9acc3a3d1fe0&sign=dfd8e0de99561ecea8e7b365397cf554 HTTP/1.0" 895 6.96ms',
        time: '2020-05-07T01:44:23.486827Z',
      },
      {
        level: 'INFO',
        message: '\u7f13\u5b58 /v2/notice/GetNewNotice?key=09831afcb002c88ef42d9acc3a3d1fe0',
        time: '2020-05-07T01:44:23.485524Z',
      },
      {
        level: 'INFO',
        message:
          '49.234.237.104 200 "GET /GetNews?op=3&id=6720&type=undefined&ts=1588815846766&key=c7f4f5175a505242e82ba003dbc52497&sign=5bb02a29e16a400a8ac95524e6ed6688 HTTP/1.0" 234 2.97ms',
        time: '2020-05-07T01:44:06.870866Z',
      },
      {
        level: 'ERROR',
        message:
          'Traceback (most recent call last):\\n  File "/usr/local/lib/python3.7/site-packages/flask/app.py", line 1950, in full_dispatch_request\\n    rv = self.dispatch_request()\\n  File "/usr/local/lib/python3.7/site-packages/flask/app.py", line 1936, in dispatch_request\\n    return self.view_functions[rule.endpoint](**req.view_args)\\n  File "/app/plugins/get_news/get_news.py", line 16, in handle_get_news\\n    res = get_news(op, int(page), id, type_id)\\n  File "/app/plugins/get_news/get_news.py", line 30, in get_news\\n    type_name = name_dic[type_id]\\nKeyError: \'undefined\'\\n',
        time: '2020-05-07T01:44:06.869732Z',
      },
      {
        level: 'INFO',
        message:
          '175.24.85.190 200 "GET /GetNews?op=3&id=undefined&type=1013&ts=1588815844067&key=558b18633fd5c7b8f327f89d05bf8efc&sign=083849140c63ef1d194c5efea7af00b0 HTTP/1.0" 234 64.09ms',
        time: '2020-05-07T01:44:04.273953Z',
      },
      {
        level: 'ERROR',
        message:
          'Traceback (most recent call last):\\n  File "/usr/local/lib/python3.7/site-packages/flask/app.py", line 1950, in full_dispatch_request\\n    rv = self.dispatch_request()\\n  File "/usr/local/lib/python3.7/site-packages/flask/app.py", line 1936, in dispatch_request\\n    return self.view_functions[rule.endpoint](**req.view_args)\\n  File "/app/plugins/get_news/get_news.py", line 16, in handle_get_news\\n    res = get_news(op, int(page), id, type_id)\\n  File "/app/plugins/get_news/get_news.py", line 42, in get_news\\n    data = json.loads(redis_news.get(type_name + id_))\\n  File "/usr/local/lib/python3.7/json/__init__.py", line 341, in loads\\n    raise TypeError(f\'the JSON object must be str, bytes or bytearray, \'\\nTypeError: the JSON object must be str, bytes or bytearray, not NoneType\\n',
        time: '2020-05-07T01:44:04.272739Z',
      },
      {
        level: 'INFO',
        message:
          '49.234.66.180 200 "GET /GetNews?op=3&id=6720&type=1013&ts=1588815841385&key=eb5e0c57b944552cc119cc8a4be3dda2&sign=52f3ad972b52d895821a35943cfd1756 HTTP/1.0" 2424 2.59ms',
        time: '2020-05-07T01:44:01.525286Z',
      },
      {
        level: 'INFO',
        message:
          '171.122.26.169 200 "GET /v2/notice/GetNewNotice?ts=1588815839896&key=0e39d9089fc042f467b9bbe035854ef7&sign=1dcba08754e14fd2d86a3b263a94001f HTTP/1.0" 895 5.13ms',
        time: '2020-05-07T01:44:00.300376Z',
      },
      {
        level: 'INFO',
        message: '\u7f13\u5b58 /v2/notice/GetNewNotice?key=0e39d9089fc042f467b9bbe035854ef7',
        time: '2020-05-07T01:44:00.299462Z',
      },
      {
        level: 'INFO',
        message:
          '175.24.69.99 200 "GET /GetNews?op=3&id=6720&type=1013&ts=1588815837845&key=2340ad8dc18cf9fc9ae607d5e2e3978e&sign=1357a57e3df8b399442b88c2821e5479 HTTP/1.0" 2424 2.65ms',
        time: '2020-05-07T01:43:57.949347Z',
      },
      {
        level: 'INFO',
        message:
          '101.91.60.72 200 "GET /v2/notice/GetNewNotice?ts=1588815836468&key=4263519f9353656b2d2e1f35c0689e7f&sign=2ce9002fed5388be2373ea10931f9b5e HTTP/1.0" 895 5.43ms',
        time: '2020-05-07T01:43:56.848374Z',
      },
      {
        level: 'INFO',
        message: '\u7f13\u5b58 /v2/notice/GetNewNotice?key=4263519f9353656b2d2e1f35c0689e7f',
        time: '2020-05-07T01:43:56.847429Z',
      },
      {
        level: 'INFO',
        message:
          '120.208.5.155 200 "GET /v2/notice/GetNewNotice?ts=1588815832846&key=7238199b4d662c5b366292f5acaff08f&sign=46ddac6874e03de9c06a75fec1c4daec HTTP/1.0" 902 2.87ms',
        time: '2020-05-07T01:43:53.675649Z',
      },
      {
        level: 'INFO',
        message:
          '\u547d\u4e2d\u7f13\u5b58 /v2/notice/GetNewNotice?key=7238199b4d662c5b366292f5acaff08f',
        time: '2020-05-07T01:43:53.674626Z',
      },
      {
        level: 'INFO',
        message:
          '120.208.178.35 200 "GET /v2/notice/GetNewNotice?ts=1588815832723&key=24beeb04af19d7fe747fc57ee6602a05&sign=98a48d7247a2e13a148d550c3cb4d2df HTTP/1.0" 895 5.26ms',
        time: '2020-05-07T01:43:52.275849Z',
      },
      {
        level: 'INFO',
        message: '\u7f13\u5b58 /v2/notice/GetNewNotice?key=24beeb04af19d7fe747fc57ee6602a05',
        time: '2020-05-07T01:43:52.274909Z',
      },
      {
        level: 'INFO',
        message:
          '124.23.134.244 200 "GET /v2/notice/GetNewNotice?ts=1588815827514&key=1467df1e06d739da83f48bb7119725a2&sign=5e6e80dd30662377ccd2f5c9e0bea8ad HTTP/1.0" 902 27.73ms',
        time: '2020-05-07T01:43:48.973659Z',
      },
      {
        level: 'INFO',
        message:
          '\u547d\u4e2d\u7f13\u5b58 /v2/notice/GetNewNotice?key=1467df1e06d739da83f48bb7119725a2',
        time: '2020-05-07T01:43:48.972550Z',
      },
      {
        level: 'INFO',
        message:
          '139.208.161.122 200 "GET /v2/notice/GetNewNotice?ts=1588815885430&key=793b427afe8c03b7e089842a4e6bb6e7&sign=882bcf6e97f39e59efd86c39edff0a55 HTTP/1.0" 895 5.22ms',
        time: '2020-05-07T01:43:46.268468Z',
      },
      {
        level: 'INFO',
        message: '\u7f13\u5b58 /v2/notice/GetNewNotice?key=793b427afe8c03b7e089842a4e6bb6e7',
        time: '2020-05-07T01:43:46.267548Z',
      },
      {
        level: 'INFO',
        message:
          '221.192.180.116 200 "GET /v2/GetGrade?name=1905040301&passwd=zbdx251489&ts=1588815817583&key=ef8a88de3cfa6d3dfd1d8a601c190965&sign=0138fdbb5830f5e101c621938734e2bd HTTP/1.0" 611 379.44ms',
        time: '2020-05-07T01:43:38.038148Z',
      },
      {
        level: 'INFO',
        message:
          '\u7f13\u5b58 /v2/GetGrade?key=ef8a88de3cfa6d3dfd1d8a601c190965&name=1905040301&passwd=zbdx251489',
        time: '2020-05-07T01:43:38.037186Z',
      },
      {
        level: 'INFO',
        message:
          '221.192.180.116 200 "GET /v2/GetCourseTable?name=1905040301&passwd=zbdx251489&ts=1588815813215&key=ef8a88de3cfa6d3dfd1d8a601c190965&sign=35dcc66e24ac0f4a1049b730ecb65201 HTTP/1.0" 1240 438.92ms',
        time: '2020-05-07T01:43:33.655591Z',
      },
      {
        level: 'INFO',
        message:
          '\u7f13\u5b58 /v2/GetCourseTable?key=ef8a88de3cfa6d3dfd1d8a601c190965&name=1905040301&passwd=zbdx251489',
        time: '2020-05-07T01:43:33.654583Z',
      },
      {
        level: 'INFO',
        message:
          '221.192.180.116 200 "GET /v2/Login?name=1905040301&passwd=zbdx251489&ts=1588815812159&key=ef8a88de3cfa6d3dfd1d8a601c190965&sign=72c8dfcd4af33e9ca5e7d12522c127b0 HTTP/1.0" 190 865.18ms',
        time: '2020-05-07T01:43:33.037960Z',
      },
      {
        level: 'INFO',
        message:
          '\u7f13\u5b58 /v2/Login?key=ef8a88de3cfa6d3dfd1d8a601c190965&name=1905040301&passwd=zbdx251489',
        time: '2020-05-07T01:43:33.037289Z',
      },
      {
        level: 'INFO',
        message:
          '223.11.4.30 200 "GET /v2/notice/GetNewNotice?ts=1588815811364&key=e3248944ba9acd4e5e4d79dea46c87fb&sign=5a6011481ceecc899f083529694ae335 HTTP/1.0" 895 5.20ms',
        time: '2020-05-07T01:43:32.203795Z',
      },
      {
        level: 'INFO',
        message: '\u7f13\u5b58 /v2/notice/GetNewNotice?key=e3248944ba9acd4e5e4d79dea46c87fb',
        time: '2020-05-07T01:43:32.202853Z',
      },
      {
        level: 'INFO',
        message:
          '220.174.67.87 200 "GET /v2/notice/GetNewNotice?ts=1588815805591&key=7b98de73c33da26473fa54dc9e45bd6d&sign=b725d331fec5fda0a5a2671ebd5be917 HTTP/1.0" 895 5.57ms',
        time: '2020-05-07T01:43:29.911445Z',
      },
      {
        level: 'INFO',
        message: '\u7f13\u5b58 /v2/notice/GetNewNotice?key=7b98de73c33da26473fa54dc9e45bd6d',
        time: '2020-05-07T01:43:29.910527Z',
      },
    ],
  },
};
