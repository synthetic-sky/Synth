#ifndef __SYNTH_SCHEDULER__
#define __SYNTH_SCHEDULER__

void scheduler_init ();
void scheduler_gate (GraphNode, GraphNode);
bool scheduler_check_condition (GraphNode, GraphNode);
GraphNode scheduler_cond_gate (GraphNode, GraphNode);
bool scheduler_call (GraphNode, GraphNode);
        
#endif