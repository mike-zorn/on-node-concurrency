{
  "targets": [
    {
      "target_name": "multiply",
      "sources": [ 
        "src/multiply.cc" 
      , "src/multiply_worker.cc"
      ],
      "include_dirs" : [
        "<!(node -e \"require('nan')\")"
      ]
    }
  ]
}
