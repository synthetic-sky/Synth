
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
    node; \
})

#define new_instance_of(base_type) ({ \
    GraphNode node = graph_node_new (); \
    graph_node_inherit(node, base_type); \
    node; \
})

bool node_has_type (GraphNode, GraphNode);