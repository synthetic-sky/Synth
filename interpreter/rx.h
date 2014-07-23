#ifndef __SYNTH_RX__
#define __SYNTH_RX__

typedef struct synth_rx_pattern_match_t {
    allocator_header
    
    GraphNode pattern;
    GraphNode root;
    
    bitfield {
        unsigned int matches : 1;
    } flags;
    
    List moorings;
    List anchors;
    
} *PatternMatch;


bool rx_does_match (GraphNode, GraphNode);
PatternMatch rx_get_match (GraphNode, GraphNode);

#endif