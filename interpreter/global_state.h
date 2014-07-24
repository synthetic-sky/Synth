#ifndef __SYNTH_GLOBAL_STATE__
#define __SYNTH_GLOBAL_STATE__

void init_global_state ();

GraphNode global_state_find_node (ident_t);
GraphNode global_state_find_or_add_node (string);
void global_state_add_node (GraphNode);

#define load_concept(name) GraphNode name = global_state_find_or_add_node (#name);

extern long _unique;
#define new_unique_ident() _unique++

HashMap synth_ident_to_node;

extern GraphNode Any;

#endif