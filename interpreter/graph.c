/*
 * Create a new graph node
 *
*/
GraphNode graph_node_new ()
{
    return synth_alloc (sizeof (struct graph_node_t));
}