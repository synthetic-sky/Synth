
#define link_origin_ident(link) link->origin->ident
#define link_target_ident(link) link->target->ident
#define link_type_ident(link) link->type->ident
#define link_origin_ptr(link) link->origin
#define link_target_ptr(link) link->target
#define link_type_ptr(link) link->type

GraphLink graph_find_link (GraphNode, GraphNode, GraphNode, bool);

#define find_incoming_link(...) graph_find_link (__VA_ARGS__, false)
#define find_outgoing_link(...) graph_find_link (__VA_ARGS__, true)

GraphNode graph_find_endpoint (GraphNode, GraphNode, GraphNode, bool);

#define find_link_target(...) graph_find_endpoint (__VA_ARGS__, false)
#define find_link_origin(...) graph_find_endpoint (__VA_ARGS__, true)

#define get_attr(node, attr_type) find_link_target (node, Any, attr_type)

#define next(node) find_link_target(node, Next, Any)