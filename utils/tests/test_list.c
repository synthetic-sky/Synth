void test_list ()
{
    plan (3, utils/list)
    List list = list_new ();
    ok (list_len (list) == 0, "lists should start out empty")
    list_push (list, list);
    ok (list_len (list) == 1, "list should have one element after one element was added")
    ok (list_get (list, 0) == list, "list should allow retrieving the added element at index 0")
}