#ifndef __SYNTH_GLOBAL_STATE__
#define __SYNTH_GLOBAL_STATE__

void init_global_state ();

GraphNode global_state_find_node (ident_t);

extern long _unique;
#define new_unique_ident() _unique++

HashMap synth_ident_to_node;

#endif