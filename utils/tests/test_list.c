void test_list ()
{
    plan (3, utils/list)
    List list = list_new ();
    ok (list_len (list) == 0, "lists should start out empty")
    list_push (list, list);
    ok (list_len (list) == 1, "list should have one element after one element was added")
    ok (list_get (list, 0) == list, "list should allow retrieving the added element at index 0")
    for (long i = 0; i < 41; i++)
        list_push (list, (void*)i);
    assert (42 > SYNTH_LIST_MIN_SIZE);
    ok (list_len (list) == 42, "list should grow nicely")
}
