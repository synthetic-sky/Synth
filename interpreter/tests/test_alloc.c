void test_alloc ()
{
    plan (3, interpreter/alloc)
    void* ptr1 = synth_alloc (10);
    void* ptr2 = synth_alloc (100);
    ok(ptr1 != NULL, "should be able to allocate 10 bytes");
    ok(ptr2 != NULL, "should be able to allocate 100 bytes");
    ok(ptr1 != ptr2, "sanity, allocator should not return a static address");
}