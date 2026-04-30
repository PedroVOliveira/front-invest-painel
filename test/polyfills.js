const { TextEncoder, TextDecoder } = require('util');
const { fetch, Request, Response, Headers } = require('whatwg-fetch');
const { ReadableStream, WritableStream, TransformStream } = require('stream/web');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.fetch = fetch;
global.Request = Request;
global.Response = Response;
global.Headers = Headers;
global.ReadableStream = ReadableStream;
global.WritableStream = WritableStream;
global.TransformStream = TransformStream;
