Utils
=====

This directory contains standard data structures, common helper routines, and so on..

```
utils/
|-- README.md
|-- chained_list.c: A version of a List which grows slowly
|-- chained_list.h
|-- chained_pool.c: A version of a Pool which grows slowly
|-- chained_pool.h
|-- cli.c: Command Line Interface helper
|-- cli.h
|-- common.h: Some common definitions (false = 0, true = 1)
|-- hash.c: Hashing routines (md5, etc.)
|-- hash.h
|-- hashmap.c: An auto-hashing interface to a Map
|-- hashmap.h
|-- list.c: A List is a variable-length vector (i.e. an array)
|-- list.h
|-- map.c: A Map is a key->value mapping, where the key is a 64bit integer, or pointer
|-- map.h
|-- pool.c: A Pool is a sparse fixed-length vector
|-- pool.h
|-- test.c: The test suite entry point
|-- test.h: A micro-sized testing framework
`-- tests
    |-- test_chained_list.c
    |-- test_chained_pool.c
    |-- test_cli.c
    |-- test_hash.c
    |-- test_hashmap.c
    |-- test_list.c
    |-- test_map.c
    |-- test_pool.c
    `-- test_sanity.c

1 directory, 29 files
```