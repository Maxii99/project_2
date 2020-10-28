# project_2
DATA VISUALIZATION PROJECT DOCUMENTATION
For a group project as a part of a UCI Data Analyst Bootcamp

A.	PROJECT GOALS 
•	Design, build and deploy visualizations tools that can be used to provide insight into Immigration profile of the US
•	Geographically map Immigration from the World to locations in the US
•	Analyze Immigration across selected demographics

B.	SCOPE
The scope of the project included using coding tools and techniques to build user-friendly interactive maps that can be used to visualize selected the flow and selected demographic profiles of immigration to the US. We deployed the visualizations in a website hosted on GitHub : https://github.com/spakyari/Project2-Immigration_data.
The final deliverables of the project include a bubble map and interactive bar and pie charts.

C.	HOW TO SETUP  FLASK AND JSON CONNECTIONS FOR PROJECT ON LOCAL MACHINES

Please take the following steps on your local machines so our Flask and JS app connections would find the something on your computers

a.	Setup PostgreSQL database:
1.	In PG Admin create a database named "migration_db"
2.	 Right click on 'db_migration'  and from the dropdown menu click on "Restore..."
3.	Once in the Restore window Find 'project_2\Flask_app\Database\db_migration_cords.sql' and restore it to your server.
4.	You should see the 3 tables under db_migration>Schemas>Tables> 'regional',  'Regions' and 'details'.
5.	Right click on each table and click on View/Edit Data>All rows and you should be able to view all the data in the CSV files.

b.	Setup Database connection:
1.	In PG Admin's browser tree view, right click on Login/Group Roles> Create>Login/Group Role...
2.	In the dialog box, set the name to be 'immigration_cnn'.
3.	Under 'Privileges' tab set everything as 'Yes' and hit save.

D.	DATA COLLECTION AND CLEANING
a.	Data Sources: The data used in this project were collected from different sources including: Department of Homeland Security, The Migration Policy Institute, Census Data, and the Pew Center.  The links to the various data sources are listed below:
https://www.migrationpolicy.org/data/state-profiles/state/income/US//
https://www.migrationpolicy.org/programs/us-immigration-policy-program-data-hub/unauthorized-immigrant-population-profiles
https://data.census.gov/cedsci/table?q=immigration&tid=ACSST1Y2019.S0502&hidePreview=true
https://www.dhs.gov/immigration-statistics
https://www.census.gov/topics/population/foreign-born.html
https://www.pewresearch.org/fact-tank/2020/08/20/key-findings-about-u-s-immigrants/ 

b.	Data and coding tools and techniques: This project employed most of the languages and tools studied at the bootcamp, including ETL techniques, sqlAlchemy, Flask, Jason, HTML and CSS styles. APIs were created to be used in the webpage application interactive tool and APIs data routes too.  The APIs were designed to give the user a variety to customize his/her query.
Below is figure showing the design structure of the project.
 
c.	New. JS library: We used AgGrid as new JS library to build tables. For documentation about this library, click : https://www.ag-grid.com/documentation-main/documentation.php

E.	HOW TO USE THE MAIN WEBSITE
The website provides a summary of the project and a snapshot of selected visualizations such as the age-pyramid chart of immigrants and a pie chart of regional diversity of immigrants in Illinois. 
On the top right corner of the website is a “Plot” button.  Clicking on that button gives the user three selection options: Demographic Profiles of Immigrants; Bubble Map and Regional Diversity of Immigrants provide visuals the flow and settlement of immigrants from different regions and countries around the world in the US, their selected demographic profiles and reginal diversity respectively.

F.	HOW TO USE THE BUBBLE MAP
a.	The Bubble Map has dropdown selections menu such as the geographic regions of birth of immigrants, specific countries of birth, year of immigration flow and State/County in which immigrants settle.
b.	The default  selection option shows bubble chart of all immigrants in the US.
c.	A user can select from a combination of these dropdowns and see where immigrants migrate from and where they settle in.
d.	If the State option is selected, the bubble map displays bubbles to indicate the total number of immigrants in the state over the period of analysis.  The size of bubble is proportional to the total number of immigrants. To get the actual number of immigrants in a state  click on the bubble over a State to display the number of immigrants .
i.	Use the Bubble map to show that California, New York and Florida are the top three States where immigrants settle.
ii.	The County selection works in a similar fashion , but it gives the user a more granular visuals of the counties with the largest immigrant populations. For instance, by selecting the county option, the bubbles display that the counties with the largest immigrant populations are  Los Angeles County in California, the Miami-Dade County in Florida, the Cook County in Illinois and king County in Washington.
iii.	Different combinations of the selection options are available to the user. For instance,  from the Region option, select a region (say, Sub Saharan Africa) and also select the County option and the map will display bubbles indicating which counties in the US immigrants from Sub Saharan African can be found.

G.	HOW TO USE THE DEMOGRAPHIC PROFILE CHARTS
From the website, select the option “Demographic Profiles of Immigrants” and this takes you to the page for Demographic Profiles for Immigrants. This page has two dropdown menus: Region and Demography.  The Region dropdown menu gives the user the option to select the region of birth of immigrants (for example, South Asia) and the Demography dropdowns offer options to select demographic factors including Age, income, Median income Education attainment and  Occupation of immigrants. 

H.	HOW TO USE THE INTERACTIVE DIVERSITY CHART
The user experience is similar to how to use the demographic profile charts. At this page, there are dropdown menu State, which provides a pie chart visualization for to show how diverse the regional composition of immigrants in the selected states is. A user has the ability to select a state/county and where immigrants in that state/region migrated from. For example, if a user selects California (or LA county) a pie chart will display the nationality makeup of immigrants in California (LA County). A hover over the pie chart shows the immigrant population by nationality.  Another interactive aspect of this is that it gives the user the ability to include or exclude a region from the pie chart analysis.

