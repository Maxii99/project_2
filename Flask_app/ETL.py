import pandas as pd
import numpy as np
import sqlite3
from sqlalchemy import create_engine

# Import Migration Map Data table.
csv_file = "CSV/Migration_Map_Data.csv"
migration_df = pd.read_csv(csv_file)
cnx = sqlite3.connect('Database/db_migration.sqlite')
migration_df.to_sql('Migration_Data', cnx)

# Import Immigration to and from 2007 to 2018 table.
csv_file = "CSV/Immigration to and from 2007 to 2018.csv"
Immigration_df = pd.read_csv(csv_file)
cnx = sqlite3.connect('Database/db_migration.sqlite')
Immigration_df.to_sql('Immigration_details', cnx)

# Import Regions table.
csv_file = "CSV/Regions.csv"
Regions_df = pd.read_csv(csv_file)
Regions_df.head()
cnx = sqlite3.connect('Database/db_migration.sqlite')
Regions_df.to_sql('Regions', cnx)

cnx.close()