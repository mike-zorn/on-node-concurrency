#include <nan.h>
#include <iostream>
#include "multiply_worker.h"

using namespace v8;

MultiplyWorker::MultiplyWorker(NanCallback *callback, long long x, long long y) 
: NanAsyncWorker(callback), x(x), y(y) { }

MultiplyWorker::~MultiplyWorker() { }
  
void MultiplyWorker::Execute () {
  this->result = 0;
  for (long long i = 0; i < this->y; i++) {
    this->result += this->x;
  }
  if (getenv("SLEEP_FOR_2") != NULL) {
    sleep(2);
  }
}

void MultiplyWorker::HandleOKCallback () {
  NanScope();

  Handle<Value> arguments [2] = { NanNull(), NanNew<Number>(this->result) };
  callback->Call(2, arguments);
}
