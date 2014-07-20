#ifndef __SYNTH_STORAGE__
#define __SYNTH_STORAGE__

#define SYNTH_NODE_STORAGE_MAX_SIZE 200*1024
#define SYNTH_LINK_STORAGE_MAX_SIZE 64

string serialize_graph_node (GraphNode);
string serialize_graph_link (GraphLink, int*);

#endif
