#ifndef __SYNTH_GRAPH__
#define __SYNTH_GRAPH__

#define ident_t long

typedef struct graph_node_t {
    allocator_header
    
    ident_t ident;
    
    List types;
    
    List links_outgoing;
    List links_incoming;
    
    // List patterns_matching;
    
    bitfield {
        unsigned int global : 1;
    } flags;
} *GraphNode;

GraphNode graph_node_new ();
GraphNode graph_node_inherit (GraphNode, GraphNode);
#define graph_node_typed(type_ident) ({ \
    GraphNode node = graph_node_new (); \
    graph_node_inherit(node, global_state_find_node (type_ident); \
})

bool node_has_type (GraphNode, GraphNode);

typedef struct graph_link_t {
    allocator_header
    
    GraphNode origin;
    GraphNode type;
    GraphNode target;
    
    bitfield {
        unsigned int primitive : 1;
    } flags;
} *GraphLink;

GraphLink graph_link_new (GraphNode, GraphNode, GraphNode);

#define link_origin_ident(link) link->origin->ident
#define link_target_ident(link) link->target->ident
#define link_type_ident(link) link->type->ident
#define link_origin_ptr(link) link->origin
#define link_target_ptr(link) link->target
#define link_type_ptr(link) link->type

GraphLink graph_find_link (GraphNode, GraphNode, GraphNode, bool);

#define find_incoming_link(...) graph_find_link (..., false)
#define find_outgoing_link(...) graph_find_link (..., true)

GraphNode graph_find_endpoint (GraphNode, GraphNode, GraphNode, bool);

#define find_link_target(...) graph_find_endpoint (..., false)
#define find_link_origin(...) graph_find_endpoint (..., true)

#endif