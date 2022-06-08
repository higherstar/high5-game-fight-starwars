import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";

import DatePicker from '../../components/CustomDatePicker';

import {
  AppContext,
  SET_DATA,
  SET_TRIP_DATA,
  LOADING_STATE
} from "../../context/AppContext";
import CustomSnackbar from "../../components/CustomSnackbar";
import CustomSwitch from "../../components/CustomSwitch";
import moment from "moment";

const getOptions = (arr) => {
  return arr.map((item) => ({
    label: item.name,
    value: item.url,
  }));
};

const formSchema = Yup.object().shape({
  people: Yup.object().nullable().required('User is required'),
  departurePlanet: Yup.object().nullable().required('Departure planet is required'),
  destinationPlanet: Yup.object().nullable().required('Destination planet is required'),
  vehicle: Yup.object().nullable().required('Vehicle is required'),
  startDate: Yup.date()
    .nullable()
    .required('Start date is required')
    .test('not_later_than_now', 'Start date should be later than now',
      function (value) {
        return (value && (moment(value)).isSameOrAfter(moment(), 'day'));
      }
    ),
  endDate: Yup.date()
    .nullable()
    .test(
      'minDate', 'End date should be later than start date',
      function (value) {
        const startDate = this.resolve(Yup.ref('startDate'));
        if (value && startDate) {
          return !(moment(value)).isBefore(moment(startDate), 'day');
        }
        return true;
      }
    )
    .test('not_later_than_now', 'End date should be later than now',
      function (value) {
        return (value && (moment(value)).isAfter(moment(), 'day'));
      }
    ),
});

function BookTrip() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);
  const [openAddStopsPanel, setOpenAddStopsPanel] = useState(false);
  const [snackMsg, setSnackMsg] = useState(false);
  
  useEffect(() => {
    if (!state.data) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      dispatch({
        type: LOADING_STATE,
        payload: "loading",
      });
      let data = {};
      const resPeople = await axios.get("https://swapi.dev/api/people");
      const resPlanet = await axios.get("https://swapi.dev/api/planets");
      const resSpecies = await axios.get("https://swapi.dev/api/species");
      const resVehicles = await axios.get("https://swapi.dev/api/vehicles");

      if (resPeople.data) {
        data.people = resPeople.data.results;
      }
      if (resPlanet.data) {
        data.planet = resPlanet.data.results;
      }
      if (resVehicles.data) {
        data.vehicles = resVehicles.data.results;
      }
      if (resSpecies.data) {
        data.species = resSpecies.data.results;
      }

      dispatch({
        type: SET_DATA,
        payload: data,
      });

    } catch (error) {
      console.log("error: ", error);
    }
  };
  
  const checkPlanets = (values) => {
    const selectedPlanets = [ values.departurePlanet, values.destinationPlanet, ...values.stops ];
    const people = state.data.people.find(p => p.name === values.people.label && p.url === values.people.value);
    const species = people.species || [];
    
    if (species.length === 0) {
      return 'Selected user does not have any available species.'
    } else {
      const planets = selectedPlanets.map(p => {
        return state.data.planet.find(planet => planet.name === p.label && planet.url === p.value);
      })
      
      // TODO planet does not contain species property
      // const unavailablePlanets = planets.map(planet => {
      //   const commonSpecies = species.filter(el => planet.species.includes(el));
      //   if (commonSpecies.length === 0) {
      //     return planet;
      //   }
      // })
      return false;
    }
  }

  const initialValues = {
    people: null,
    startDate: new Date(),
    endDate: new Date(),
    departurePlanet: null,
    destinationPlanet: null,
    vehicle: null,
    stops: [],
    isOnewayTrip: false
  }

  const formik = useFormik({
    validationSchema: formSchema,
    initialValues: state.tripData || initialValues,
    onSubmit: (values) => {
      const result = checkPlanets(values);
      if (!result) {
        dispatch({
          type: SET_TRIP_DATA,
          payload: values,
        });
  
        navigate('/detail');
      } else {
        setSnackMsg(result);
      }
    },
  });
  
  const toggleAddStopsPanel = () => {
    setOpenAddStopsPanel(!openAddStopsPanel);
  }
  
  const goToSeatSelect = () => {
    dispatch({
      type: SET_TRIP_DATA,
      payload: formik.values,
    });
    navigate('/seat-map')
  }
  
  return (
    <div>
      <h1 className="text-center mb-8 mt-6 text-2xl">Book trip</h1>
      {state.loadingState === "loading" &&
        <div className="w-full h-md flex justify-center items-center">
          <h1>Loading data...</h1>
        </div>
      }
      {state.loadingState === "success" && (
        <form onSubmit={formik.handleSubmit}>
          <div className="flex justify-center w-full">
            <div className=" w-full max-w-[600px]">
              <div className="mb-8">
                <label className="mb-2">User</label>
                <Select
                  options={getOptions(state.data.people)}
                  {...formik.getFieldProps("people")}
                  onChange={(option) => formik.setFieldValue('people', option)}
                />
                {formik.touched.people && formik.errors.people ? (
                  <span className="text-xs text-red-500">
                    {formik.errors.people}
                  </span>
                ) : null}
              </div>
  
              <div className="mb-8">
                <label className="mb-2">Trip Type</label>
                <div className="flex items-center mt-2">
                  <div className="text-md font-medium mr-6">Round Trip</div>
                  <CustomSwitch
                    {...formik.getFieldProps("isOnewayTrip")}
                    onChange={(value) => formik.setFieldValue('isOnewayTrip', value)}
                  />
                </div>
              </div>

              <div className="w-full flex">
                <div className="mb-8 w-[50%]">
                  <label className="mb-2">Start Date</label>
                  <div className="w-[fit-content] p-2 bg-gray-100 rounded-lg shadow-xl">
                    <DatePicker
                      label="Date"
                      {...formik.getFieldProps("startDate")}
                      onChange={(date) => formik.setFieldValue('startDate', date)}
                    />
                  </div>
                  {formik.touched.startDate && formik.errors.startDate ? (
                      <span className="text-xs text-red-500">
                    {formik.errors.startDate}
                  </span>
                  ) : null}
                </div>

                <div className="mb-8 w-[50%]">
                  <label className="mb-2">End Date</label>
                  <div className="w-[fit-content] p-2 bg-gray-100 rounded-lg shadow-xl">
                    <DatePicker
                        label="Date"
                        {...formik.getFieldProps("endDate")}
                        onChange={(date) => formik.setFieldValue('endDate', date)}
                    />
                  </div>
                  {formik.touched.endDate && formik.errors.endDate ? (
                      <span className="text-xs text-red-500">
                    {formik.errors.endDate}
                  </span>
                  ) : null}
                </div>
              </div>
              
              <div className="mb-2">
                <label className="mb-2">Departure planet</label>
                <Select
                  options={getOptions(state.data.planet)}
                  {...formik.getFieldProps("departurePlanet")}
                  onChange={(option) => formik.setFieldValue('departurePlanet', option)}
                />
                {formik.touched.departurePlanet && formik.errors.departurePlanet ? (
                  <span className="text-xs text-red-500">
                    {formik.errors.departurePlanet}
                  </span>
                ) : null}
              </div>
              
              <div className="mb-6">
                <span className="text-md text-blue-600 font-medium mb-8 cursor-pointer" onClick={toggleAddStopsPanel}>+ Add Stops</span>
                {
                  openAddStopsPanel &&
                  <div className="mt-2">
                    <Select
                      isMulti
                      options={getOptions(state.data.planet)}
                      {...formik.getFieldProps("stops")}
                      onChange={(option) => formik.setFieldValue('stops', option)}
                    />
                  </div>
                }
              </div>

              <div className="mb-8">
                <label className="mb-2">Destination planet</label>
                <Select
                    options={getOptions(state.data.planet)}
                    {...formik.getFieldProps("destinationPlanet")}
                    onChange={(option) => formik.setFieldValue('destinationPlanet', option)}
                />
                {formik.touched.destinationPlanet && formik.errors.destinationPlanet ? (
                  <span className="text-xs text-red-500">
                    {formik.errors.destinationPlanet}
                  </span>
                ) : null}
              </div>

              <div className="mb-8">
                <label className="mb-2">Vehicle</label>
                <Select
                  options={getOptions(state.data.vehicles)}
                  {...formik.getFieldProps("vehicle")}
                  onChange={(option) => formik.setFieldValue('vehicle', option)}
                />
                {formik.touched.vehicle && formik.errors.vehicle ? (
                  <span className="text-xs text-red-500">
                    {formik.errors.vehicle}
                  </span>
                ) : null}
              </div>
  
              <div className="mb-2 flex justify-end">
                <span className="text-lg text-blue-600 font-medium mb-2 cursor-pointer" onClick={goToSeatSelect}>Select Seat ></span>
              </div>

              {/*<Select*/}
              {/*  className="mb-8"*/}
              {/*  defaultValue={getOptions(state.data.species)[0]}*/}
              {/*  options={getOptions(state.data.species)}*/}
              {/*/>*/}

              <button
                type="submit"
                className={`text-xl text-white bg-blue-600 w-full rounded whitespace-nowrap py-2`}
              >
                Confirm
              </button>
            </div>
          </div>
        </form>
      )}
      <CustomSnackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        isOpen={Boolean(snackMsg)}
        message={snackMsg}
        type='error'
        onClose={() => setSnackMsg(false)}
      />
    </div>
  );
}

export default BookTrip;
