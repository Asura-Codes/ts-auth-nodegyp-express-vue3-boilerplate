{
  "targets": [
    {
      "target_name": "CppAssist",
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      "sources": [
        "src/main.cpp" 
      ],
      "include_dirs": [
        "./",
      ],
      "libraries": [],
      "defines": [ "NAPI_DISABLE_CPP_EXCEPTIONS" ]
    }
  ]
}