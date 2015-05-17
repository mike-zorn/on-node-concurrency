#include <nan.h>
#include "multiply_worker.h"

using namespace v8;

NAN_METHOD(Multiply) {
  NanScope();

  long long x = args[0].As<Number>()->Value();
  long long y = args[1].As<Number>()->Value();
  Local<Function> callback = args[2].As<Function>();
  
  NanCallback* nanCallback = new NanCallback(callback);

  MultiplyWorker* worker = new MultiplyWorker(nanCallback, x, y);
  
  NanAsyncQueueWorker(worker);

  NanReturnUndefined();
}

void Init(Handle<Object> exports) {
  exports->Set(NanNew("multiply"), 
      NanNew<FunctionTemplate>(Multiply)->GetFunction());
}

NODE_MODULE(multiply, Init)
