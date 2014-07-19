#ifndef __SYNTH_TEST__
#define __SYNTH_TEST__

// micro test framework
static int test_number;
static int planned_tests;
#define ok(result, description) \
	test_number++; \
	if (result) printf("ok, %i\n", test_number); else printf("fail, %i: %s\n", test_number, #description);
#define fail(result, description) ok(!(result), description)
#define plan(num, title) planned_tests = num; printf("Planned %i tests for %s..\n", num, #title);

// test suite
void test_suite ();
void test_sanity ();
void test_alloc ();
void test_list ();

#endif