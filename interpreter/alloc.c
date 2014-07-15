void* synth_alloc (int bytes)
{
    return malloc (bytes);
}

void* synth_realloc (void* buffer, int bytes)
{
    return realloc (buffer, bytes);
}