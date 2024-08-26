import CategoryButtonsShad from "../components/userDashComponents/categorybuttonsShad";
import JobListings from "../components/userDashComponents/jobListings";
import SelectedJob from "../components/userDashComponents/selectedJob";
import SlectedCategoryButtons from "../components/userDashComponents/slectedCategoryButtons";

export default function App(){


  return<>

  <CategoryButtonsShad/>
  <SlectedCategoryButtons/>
  <div className=" grid gap-5 border-0 p-5 md:grid-cols-12 md:min-w-[930px]">
    <div className=" md:col-span-5"><JobListings/></div>
    <div className=" h-screen md:col-span-7"><SelectedJob /></div>
  </div>  
    
  </>
}
  