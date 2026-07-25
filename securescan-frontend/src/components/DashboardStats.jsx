import { useMemo } from "react";


function DashboardStats({ scans }) {


  const {
    totalScans,
    safeScans,
    suspiciousScans,
    maliciousScans,
    averageScore,

  } = useMemo(() => {


    const totalScans = scans.length;


    const safeScans = scans.filter(
      (scan)=>scan.status==="Safe"
    ).length;


    const suspiciousScans = scans.filter(
      (scan)=>scan.status==="Suspicious"
    ).length;


    const maliciousScans = scans.filter(
      (scan)=>scan.status==="Malicious"
    ).length;



    const averageScore =

      totalScans > 0

      ?

      Math.round(

        scans.reduce(
          (total,scan)=>
          total + (scan.score || 0),
          0
        )
        /
        totalScans

      )

      :

      0;



    return {

      totalScans,
      safeScans,
      suspiciousScans,
      maliciousScans,
      averageScore,

    };


  },[scans]);





  const stats = [

    {
      className:"",
      icon:"📊",
      title:"Total Scans",
      value:totalScans,
      description:"Completed security scans"
    },


    {
      className:"safe",
      icon:"🟢",
      title:"Safe",
      value:safeScans,
      description:"Secure websites"
    },


    {
      className:"suspicious",
      icon:"🟡",
      title:"Suspicious",
      value:suspiciousScans,
      description:"Require attention"
    },


    {
      className:"malicious",
      icon:"🔴",
      title:"Malicious",
      value:maliciousScans,
      description:"High-risk websites"
    }


  ];





  return (

    <div className="stats-grid">



      {
        stats.map((item,index)=>(


          <div
            className={`stat-card ${item.className}`}
            key={index}
          >


            <div className="stat-icon">

              {item.icon}

            </div>



            <h3>

              {item.title}

            </h3>



            <h1 className="stat-number">

              {item.value}

            </h1>



            <small>

              {item.description}

            </small>



          </div>


        ))
      }






      <div className="stat-card average">


        <div className="stat-icon">

          ⭐

        </div>



        <h3>
          Average Score
        </h3>



        <h1 className="stat-number">

          {averageScore}/100

        </h1>




        <progress

          value={averageScore}

          max="100"

          className="average-progress"

        />




        <small>

          Overall security rating

        </small>



      </div>




    </div>

  );

}


export default DashboardStats;