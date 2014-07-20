#ifndef __SYNTH_GRAPH__
#define __SYNTH_GRAPH__

#define ident_t long

typedef struct graph_node_t {
    allocator_header
    
    ident_t ident;
    
    // struct graph_node_t* type;
    
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

#endif