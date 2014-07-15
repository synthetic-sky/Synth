#ifndef __SYNTH_GRAPH__
#define __SYNTH_GRAPH__

typedef struct graph_node_t {
    allocator_header
    
} *GraphNode;

GraphNode graph_node_new ();

#endif