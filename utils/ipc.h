#ifndef __SYNTH_IPC__
#define __SYNTH_IPC__

inline static string invoke_and_capture_output (string cmd)
{
    FILE* file = popen (cmd, "r");
    static ascii buf       [10000000];
    zero_field (buf);
    int rb = fread (buf, 1, 10000000, file);
    if (rb >= 0)
        return buf;
    else
        return ""; // nys
}

#endif
