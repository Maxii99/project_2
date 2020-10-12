import numpy as np
import datetime as dt

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect

from flask import Flask, jsonify

#################################################
# Database Setup
#################################################
#rds_connection_string = "ETLprj:ScottSaid110!@localhost:5432/migration_db"
rds_connection_string = "immigration_cnn:@localhost:5432/migration_db"
engine = create_engine(f'postgresql://{rds_connection_string}')

#'immigration_cnn

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
details = Base.classes.details

print(Base.classes.keys())


