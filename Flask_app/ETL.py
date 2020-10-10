import numpy as np
import datetime as dt

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine( "sqlite:///C:\\db\\hawaii.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
measurments = Base.classes.measurement
station = Base.classes.station

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/precipitation<br/>"
        f"/api/v1.0/stations<br/>"
        f"/api/v1.0/tobs<br/>"
        f"/api/v1.0/(start)<br/>"
        f"/api/v1.0/(start)/(end)<br/>"
    )


@app.route("/api/v1.0/precipitation")
def prcps():

    # Convert the query results to a dictionary using date as the key and prcp as the value.

    # Create our session (link) from Python to the DB
    session = Session(engine)

   
    # Query all dates and paticipations
    results = session.query(measurments.date, measurments.prcp).all()

    session.close()

    # Create a dictionary of the dates and participations
    prcps = dict((date, prcp) for date, prcp in results)

    return jsonify(prcps)




if __name__ == '__main__':
    app.run(debug=True)
