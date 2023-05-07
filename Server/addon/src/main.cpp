#include <node.h>
#include <v8.h>

#include <string>
#include <algorithm>
#include <time.h>


struct SomeStruct
{
    uint64_t valueBigInt {123};
    bool valueBoolean { true };
    double valueDate { 1683390394000 };
    int valueInteger { 124 };
    double valueNumber { 125. };
    std::string valueString { "Hello" };
};


std::unique_ptr<SomeStruct> g_instance;

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;

void IsLoaded(const FunctionCallbackInfo<v8::Value> &args)
{
    Isolate *isolate = args.GetIsolate();

    // Return Boolean (=== true)
    args.GetReturnValue().Set(v8::Boolean::New(isolate, (bool)true));
}

void StringMethod(const FunctionCallbackInfo<v8::Value> &args)
{
    Isolate *isolate = args.GetIsolate();

    const int noParameters = args.Length();

    Local<v8::String> retStr{ v8::String::NewFromUtf8(isolate, g_instance->valueString.c_str()).ToLocalChecked() };
    for (int i = 0; i < noParameters; i++)
    {
        if (args[i]->IsString()) {
            retStr = v8::String::Concat(isolate, retStr, args[i].As<v8::String>());
        }
    }

    // Return concatenated string
    args.GetReturnValue().Set(retStr);
}

void NumberMethod(const FunctionCallbackInfo<v8::Value> &args)
{
    Isolate *isolate = args.GetIsolate();

    const int noParameters = args.Length();

    double retNum{ g_instance->valueNumber };
    for (int i = 0; i < noParameters; i++)
    {
        if (args[i]->IsNumber()) {
            retNum += args[i].As<v8::Number>()->Value();
        }
    }

    // Return sum of numbers (passed as arguments)
    args.GetReturnValue().Set(v8::Number::New(isolate, retNum));
}

void ArrayMethod(const FunctionCallbackInfo<v8::Value> &args)
{
    Isolate *isolate = args.GetIsolate();
    Local<v8::Context> context = isolate->GetCurrentContext();

    Local<v8::BigInt> valueBigInt = v8::BigInt::New(isolate, g_instance->valueBigInt);
    Local<v8::Boolean> valueBoolean = v8::Boolean::New(isolate, g_instance->valueBoolean);
    Local<v8::Value> valueDate = v8::Date::New(context, g_instance->valueDate).ToLocalChecked();
    Local<v8::Function> valueFunction = v8::Function::New(context, StringMethod).ToLocalChecked();
    Local<v8::Integer> valueInteger = v8::Integer::New(isolate, g_instance->valueInteger);
    Local<v8::Number> valueNumber = v8::Number::New(isolate, g_instance->valueNumber);
    Local<v8::String> valueString = v8::String::NewFromUtf8(isolate, g_instance->valueString.c_str()).ToLocalChecked();
    Local<v8::Symbol> valueSymbol = v8::Symbol::New(isolate, valueString);
    
    Local<v8::Array> valueArray = v8::Array::New(isolate, 8);

    valueArray->Set(context, 0, valueBigInt);
    valueArray->Set(context, 1, valueBoolean);
    valueArray->Set(context, 2, valueDate);
    valueArray->Set(context, 3, valueFunction);
    valueArray->Set(context, 4, valueInteger);
    valueArray->Set(context, 5, valueNumber);
    valueArray->Set(context, 6, valueString);
    valueArray->Set(context, 7, valueSymbol);

    // Return Array (each element has different type)
    args.GetReturnValue().Set(valueArray);
}

void ObjectMethod(const FunctionCallbackInfo<v8::Value> &args)
{
    Isolate *isolate = args.GetIsolate();
    Local<v8::Context> context = isolate->GetCurrentContext();

    Local<v8::BigInt> valueBigInt = v8::BigInt::New(isolate, g_instance->valueBigInt);
    Local<v8::Boolean> valueBoolean = v8::Boolean::New(isolate, g_instance->valueBoolean);
    Local<v8::Value> valueDate = v8::Date::New(context, g_instance->valueDate).ToLocalChecked();
    Local<v8::Function> valueFunction = v8::Function::New(context, StringMethod).ToLocalChecked();
    Local<v8::Integer> valueInteger = v8::Integer::New(isolate, g_instance->valueInteger);
    Local<v8::Number> valueNumber = v8::Number::New(isolate, g_instance->valueNumber);
    Local<v8::String> valueString = v8::String::NewFromUtf8(isolate, g_instance->valueString.c_str()).ToLocalChecked();
    Local<v8::Symbol> valueSymbol = v8::Symbol::New(isolate, valueString);
    
    Local<v8::Object> valueObject = v8::Object::New(isolate);

    valueObject->Set(context, 
        v8::String::NewFromUtf8(isolate, "valueBigInt").ToLocalChecked(), valueBigInt);
    valueObject->Set(context, 
        v8::String::NewFromUtf8(isolate, "valueBoolean").ToLocalChecked(), valueBoolean);
    valueObject->Set(context, 
        v8::String::NewFromUtf8(isolate, "valueDate").ToLocalChecked(), valueDate);
    valueObject->Set(context, 
        v8::String::NewFromUtf8(isolate, "valueFunction").ToLocalChecked(), valueFunction);
    valueObject->Set(context, 
        v8::String::NewFromUtf8(isolate, "valueInteger").ToLocalChecked(), valueInteger);
    valueObject->Set(context, 
        v8::String::NewFromUtf8(isolate, "valueNumber").ToLocalChecked(), valueNumber);
    valueObject->Set(context, 
        v8::String::NewFromUtf8(isolate, "valueString").ToLocalChecked(), valueString);
    valueObject->Set(context, 
        v8::String::NewFromUtf8(isolate, "valueSymbol").ToLocalChecked(), valueSymbol);

    // Return Object with elements of different types
    args.GetReturnValue().Set(valueObject);
}

void SetBigInt(const FunctionCallbackInfo<v8::Value> &args)
{
    Isolate *isolate = args.GetIsolate();

    if (args.Length() == 1 && args[0]->IsBigInt()) {
        g_instance->valueBigInt = args[0].As<v8::BigInt>()->Uint64Value();
        args.GetReturnValue().Set(v8::Boolean::New(isolate, true));
    }
}

void SetBoolean(const FunctionCallbackInfo<v8::Value> &args)
{
    Isolate *isolate = args.GetIsolate();

    if (args.Length() == 1 && args[0]->IsBoolean()) {
        g_instance->valueBoolean = args[0].As<v8::Boolean>()->Value();
        args.GetReturnValue().Set(v8::Boolean::New(isolate, true));
    }
}

void SetDate(const FunctionCallbackInfo<v8::Value> &args)
{
    Isolate *isolate = args.GetIsolate();

    if (args.Length() == 1 && args[0]->IsDate()) {
        g_instance->valueDate = args[0].As<v8::Date>()->ValueOf();
        args.GetReturnValue().Set(v8::Boolean::New(isolate, true));
    }
}

void SetInteger(const FunctionCallbackInfo<v8::Value> &args)
{
    Isolate *isolate = args.GetIsolate();

    if (args.Length() == 1 && args[0]->IsInt32()) {
        g_instance->valueInteger = args[0].As<v8::Int32>()->Value();
        args.GetReturnValue().Set(v8::Boolean::New(isolate, true));
    }
}

void SetNumber(const FunctionCallbackInfo<v8::Value> &args)
{
    Isolate *isolate = args.GetIsolate();

    if (args.Length() == 1 && args[0]->IsNumber()) {
        g_instance->valueNumber = args[0].As<v8::Number>()->Value();
        args.GetReturnValue().Set(v8::Boolean::New(isolate, true));
    }
}

void SetString(const FunctionCallbackInfo<v8::Value> &args)
{
    Isolate *isolate = args.GetIsolate();

    if (args.Length() == 1 && args[0]->IsString()) {
        g_instance->valueString = v8::String::Utf8Value (isolate, args[0].As<v8::String>()).operator*();
        args.GetReturnValue().Set(v8::Boolean::New(isolate, true));
    }
}

/**
 * Each function to be visible by node.js must be defined here
 * and has type: void (*)(const FunctionCallbackInfo<v8::Value>&)
 */
void Initialize(Local<v8::Object> exports, Local<v8::Value> /*module*/, void */*priv*/)
{  
    g_instance = std::make_unique<SomeStruct>();

    NODE_SET_METHOD(exports, "IsLoaded", IsLoaded);
    NODE_SET_METHOD(exports, "CppString", StringMethod);
    NODE_SET_METHOD(exports, "CppNumber", NumberMethod);
    NODE_SET_METHOD(exports, "CppArray", ArrayMethod);
    NODE_SET_METHOD(exports, "CppObject", ObjectMethod);
    
    NODE_SET_METHOD(exports, "SetBigInt", SetBigInt);
    NODE_SET_METHOD(exports, "SetBoolean", SetBoolean);
    NODE_SET_METHOD(exports, "SetDate", SetDate);
    NODE_SET_METHOD(exports, "SetInteger", SetInteger);
    NODE_SET_METHOD(exports, "SetNumber", SetNumber);
    NODE_SET_METHOD(exports, "SetString", SetString);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize)   