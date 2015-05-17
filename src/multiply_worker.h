#ifndef MULTIPLY_WORKER
#define MULTIPLY_WORKER

#include <nan.h>

class MultiplyWorker : public NanAsyncWorker {
  public:
    MultiplyWorker(NanCallback *callback, long long x, long long y);
    void Execute();
    void HandleOKCallback();

  protected:
    long long x;
    long long y;
    long long result;
    ~MultiplyWorker();  
};

#endif
