/*
 * Create a new *node* of type **base_type** in the given **state**.
 *
*/
void gc_op_add_node (GraphNode state, GraphNode base_type)
{
    GraphNode node = new_instance_of (base_type);
    
    graph_color_add_elem (state, node);
}

/*
 * Delete a **node** from a **state**.
 *
*/
void gc_op_del_node (GraphNode state, GraphNode node)
{
    // ...
}

/*
 * Connect two *nodes* with a new link of *type*.
 *
*/
void gc_op_add_link (GraphNode state, GraphNode origin, GraphNode relation, GraphNode target)
{
    // ...
}

/*
 * Delete a link of type *type* between two *nodes*.
 *
*/
void gc_op_del_link (GraphNode state, GraphNode origin, GraphNode relation, GraphNode target)
{
    // ...
}