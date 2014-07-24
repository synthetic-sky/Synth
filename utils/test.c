/*
 * Globals used by the test framework
 *
*/
int test_number, tests_passed, tests_failed, tests_skipped,
      planned_tests, last_test_passed;

/*
 * Test the graph-code interpreter (i.e. construction-level 1)
 *
*/
void test_suite ()
{
	test_sanity ();
	test_summary ()
	
	test_alloc ();
	test_summary ()
	
    test_list ();
	test_summary ()
	
	test_hashmap ();
	test_summary ()
	
    test_storage ();
	test_summary ()
	
    test_graph ();
	test_summary ()
	
    test_parser ();
	test_summary ()
	
	test_rx ();
	test_summary ()
}