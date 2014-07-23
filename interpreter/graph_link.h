
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

#define graph_connect graph_link_new