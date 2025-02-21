Feature: DxT Froms - Acceptance Tests

    Scenario: Log in
        Given I'm a user with permissions
        When I go to Forms Editor
        And sign in
        Then I'm logged into the Forms Editor
    Scenario: Forms Library Search Sort and Filter
        Given I'm logged in
        When I got Forms Library
        Then the list of forms is displayed
        And I can sort them
        And I can search for a form
        And I can filter a form

    Scenario: Create a draft form
        Given I'm logg in
        When Create a new draft form
        And add a page
        Then a draft form is created successfully

    Scenario: Preview Draft Form
        Given there is a valid draft form
        When I preview the form
        Then Form is loaded
        And Able to submit the form

    Scenario: Publish a form
        Given I have a draft form
        And add mandatory form metatdata
        When I publish the form
        Then form is promoted to live
        And draft is removed

    Scenario: Download JSON
        Given I have a form
        When I got the editor
        And select download JSONn
        Then A file containing json is downloaded

    Scenario: Upload JSON
        Given I have a JSON file containing a form definition
        When I go to the editor
        And upload the file
        Then Editor updates the form based on the file

    Scenario: Create a list
        Given I have list of items
        When I go to the editor and create a list
        And add items to my list
        Then the list is created

    Scenario: Re-order list items
        Given I have a list with items
        When I view the list
        Then I can move items up and down
        And the order is reflected when its added to a page

    Scenario: List not editable once linked
        Given I have a list with items
        And it's associated with a condition in the form
        When I view the list
        Then I cannot rename the list or delete

    Scenario: Add list item to an existing list
        Given I have a list with items
        And it's associated with a condition in the form
        When I view the list
        Then I can add a new item to the list

    Scenario: Edit list item to an existing list
        Given I have a list with items
        And it's associated with a condition in the form
        When I view the list
        Then I can add a new item to the list

    Scenario: Re-order Pages (V2 editor + visual indicator)
        Given a v2 form with multiple pages exists
        When I re-order a page
        Then the order is updated

    Scenario: Forms submission Email
        Given A form has a draft and outout email set
        When form is submitted
        Then Output email is sent
        And the email is displayed correctly
        And CSV containing form data can be downloaded
        And CSV contains the correct data

    Scenario: Forms submission emaill with File Upload mandatory
        Given A form has a draft form and outout email set
        And the form has a file upload mandaoty component
        When form is submitted
        Then Output email is sent
        And the email is displayed correctly
        And attached file can be dowmloaded
        And has correct data in the csv

    Scenario: Forms submission emaill with Add Another mandatory
        Given A form has a draft form and outout email set
        And the form has a Add Another mandaoty component
        When form is submitted
        Then Output email is sent
        And the email is displayed correctly
        And Add another CSV file can be dowmloaded
        And has correct data in the csv

    Scenario: Forms submission emaill with File Upload optional
        Given A form has a draft form and outout email set
        And the form has a file upload mandaoty component
        When form is submitted
        Then Output email is sent
        And the email is displayed correctly
        And attached file can be dowmloaded
        And has correct data in the csv

    Scenario: Forms submission emaill with Add Another optional
        Given A form has a draft form and outout email set
        And the form has a Add Another mandaoty component
        When form is submitted
        Then Output email is sent
        And the email is displayed correctly
        And Add another CSV file can be dowmloaded
        And has correct data in the csv

    Scenario Outline: Create condition
        Given I have a page with <component> on a page
        When I add  <condition> <value> condition
        And I submit the page with <value>
        Then condition should trigger
        Examples:
            | component | condition | value  |
            | text      | is        | bob    |
            | number    | less than | 18     |
            | Yes/No    | is        | Yes    |
            | Checkbox  | banana    | banana |




