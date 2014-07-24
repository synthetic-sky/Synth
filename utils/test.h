#ifndef __SYNTH_TEST__
#define __SYNTH_TEST__

/*
 * Micro Test Framework
 *
 *  We use this tiny framework consisting exclusively of macros
 *   in order to write *test_xxx* routines for all the C code.
 *
 *  These routines are declared at the end of this file, 
 *    and invoked by **test_suite()**, defined in *test.c*.
*/

/*
 * *declarations of*: Globals used by the test framework.
 *
*/
extern int test_number, tests_passed, tests_failed, tests_skipped,
            planned_tests, last_test_passed;

/*
 * A single test assertion.
 *
 *  *Only used internally.*
*/
#define test(result, description) ({ \
    bool _ok = result; \
	test_number++; \
	if (_ok) \
	{ \
	    if (last_test_passed) \
	        printf (" " ANSI_COLOR_GREEN "%i" ANSI_COLOR_RESET, test_number); \
	    else \
	        printf ("\n" ANSI_COLOR_GREEN "ok" ANSI_COLOR_RESET ", " ANSI_COLOR_GREEN "%i" ANSI_COLOR_RESET, test_number); \
	    last_test_passed = true; \
	    tests_passed ++; \
	} \
	else \
	{ \
	    printf("\nfail, " ANSI_COLOR_RED "%i" ANSI_COLOR_RESET ": %s", test_number, #description); \
	    last_test_passed = false; \
	    tests_failed ++; \
	} \
	_ok; \
})

/*
 * Specific macros exposed to make specific assertions.
 *
 *   e.g. **ok(1)** is *true*,
 *   and **nok(12)** is *false*
*/
#define ok(r,d) test(r,d);
#define nok(r,d) test(!(r),d);
#define fail nok

/*
 * Assert that we will run **num** tests.
 *
 *  Also, give a **title** to this set of assertions.
 *   Usually, the title should indicate the component or function under test.
*/
#define plan(num, title) \
    planned_tests = num; test_number = 0; \
    tests_passed = tests_failed = tests_skipped = 0; \
    last_test_passed = false; \
    printf ("\n---\n");\
    printf ("planned " ANSI_COLOR_BLUE "%i" ANSI_COLOR_RESET \
                " tests for " ANSI_COLOR_BLUE "%s" ANSI_COLOR_RESET  \
            "\n", num, #title \
    );
    
/* 
 * Print a summary of the recent batch of tests.
 *
*/
#define test_summary() \
    printf ("\n\n" \
        ANSI_COLOR_GREEN  "%i" ANSI_COLOR_RESET " passed, " \
        ANSI_COLOR_RED    "%i" ANSI_COLOR_RESET " failed, " \
        ANSI_COLOR_YELLOW "%i" ANSI_COLOR_RESET " skipped", \
            tests_passed, tests_failed, tests_skipped \
    ); \
    if (planned_tests != test_number) \
        printf (ANSI_COLOR_RED "\n failed to run %i out of %i tests" ANSI_COLOR_RESET, planned_tests - test_number, planned_tests); \
    printf ("\n---\n");

/*
 * Skip a test, giving a **reason**.
 *
*/
#define skip(reason) \
    printf("\n" ANSI_COLOR_YELLOW " skip, %i: %s" ANSI_COLOR_RESET, ++test_number, reason); \
    tests_skipped ++;

/*
 * *declarations of*: The Interpreter Test Suite
 *
*/
void test_suite ();
void test_sanity ();
void test_alloc ();
void test_list ();
void test_storage ();
void test_graph ();
void test_parser ();

#endif