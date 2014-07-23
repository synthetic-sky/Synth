#define list_v1_iter(list_node, name, block) ({ \
        load_concept (Next); \
        GraphNode name = list_node; \
        do { \
            block; \
        } while ((name = next (name))); \
    })

void gc_op_add_node (GraphNode, GraphNode);
void gc_op_del_node (GraphNode, GraphNode);
void gc_op_add_link (GraphNode, GraphNode, GraphNode, GraphNode);
void gc_op_del_link (GraphNode, GraphNode, GraphNode, GraphNode);