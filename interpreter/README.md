Interpreter
===========

## Files

interpreter/
|-- README.md: An overview of what's in this directory
|-- alloc.c: A custom memory allocator
|-- alloc.h
|-- alloc_types.h: Type -> Number and Number -> Type-Name mappings
|-- graph.c: The graph implementation
|-- graph.h
|-- interp.c: The graph-code eval routines
|-- interp.h
|-- parser.c: The paw-to-graph-code convertor 
|-- parser.h
|-- repl.c: A basic interactive shell, enabling basic access to the insides of a running mind
|-- repl.h
|-- runloop.c: A runloop which keeps the thought going [diff from sched?)
|-- runloop.h
|-- rx.c: A basic pattern matching engine, for acyclical graphs [possibly, here, only simple trees]
|-- rx.h
|-- sched.c: The basic scheduler which decides which paths to take, and which coordinates the data flow
|-- sched.h
|-- signals.c: Interrupt handling, including keyboard interrupts, messages from the web interface, etc.
|-- signals.h
`-- tests
    |-- test_alloc.c
    |-- test_graph.c
    |-- test_parser.c
    |-- test_rx.c
    `-- test_sched.c

1 directory, 25 files

## Intro

The Synth mind is based on an interpreter, sometimes called paw, which is defined herein.

Once compiled the interpreter can be invoked with a set of options which define its runtime behavior.

Basically, it loads a few predefined modules (aka the Mind), and then runs a script (aka the Scenario).

There are also other runtime behaviors possible, such as the eventual goal: an autonomous agent. This latter simply requires loading a Mind which has a pre-defined set of objectives, and connecting it to a domain of action.

## Components

### The Graph

### The Parser

### The Scheduler

### The Allocator

### The RX engine

### The REPL
