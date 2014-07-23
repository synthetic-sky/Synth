#ifndef __SYNTH_INTERPRETER__
#define __SYNTH_INTERPRETER__

typedef GraphNode GraphCode;

void interpreter_eval (GraphNode, GraphCode);
bool interpreter_eval_file (string);

#endif