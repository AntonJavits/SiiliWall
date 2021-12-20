import { red } from "@mui/material/colors";
import { makeStyles } from "@mui/styles"

const colours = {
  yellow: "#FFE100",
  green: "#00F09B",
  red: "#FA0000",
  pink: "#FF41FF",
  purple: "#AA32FF",
  blue: "#3232FF",
  white: "#FFFFFF",
  black: "#000000",
  gray: "#949494",
  lightgrey: "#E3E3E3",
  lightergrey: "#F5F5F5",
  darkergrey: "#dedede",
  darkestgrey: "#3d3d3d",
};

const font = "Arial Regular";

export const projectPageStyles = makeStyles({
/*    root: {
     minHeight: "20vh", 
  },
 */
/*    topBarContainer: {
    borderBottom: "1px solid #d5d5d5",
  },

  logo: {
    textTransform: "uppercase",
    fontSize: "0.6em",
    color: "#3f3f3f",
  },
 
  headerContainer: {
    borderBottom: "1px solid #d5d5d5",
     paddingBottom: '2em',
    marginTop: "1em",
  }, 
 */
/*   contentContainer: {
    marginTop: '2em',
  },

   headerTitle: {
    fontSize: "3rem",
    fontWeight: "normal",
    whiteSpace: "nowrap",
  },

  contentTitle: {
    fontSize: "2.5rem",
    fontWeight: "normal",
  },  */

/*   boardButtonGrid: {
    minWidth: 200,
  },
  boardButtonGridLongText: {
    maxHeight: 200,
    maxWidth: 200,
  }, */

/*   boardButton: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: colours.white,
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    fontSize: "0.9rem",
    minWidth: "16rem",
  }, */

   /*  navigationButton: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: colours.white,
        height: 35,
        padding: '0 30px',
        margin: '10px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        fontSize: '0.8rem',
        minWidth: '8rem',
    },

    addNewButton: {
        height: '6rem',
        width: '6rem',
        fontSize: '0.7rem',
        fontWeight: 'bold',
        borderRadius: '50%',
        border: '2px solid #ff8d58',
        color: '#ff8d58',
        textAlign: 'center',
        textDecoration: 'none',
    },
 */
})

export const boardPageStyles = makeStyles({
    root: {
/*         minHeight: '100%',
        minWidth: '100%',
        padding: 10,
        paddingLeft: "50px", 
        paddingRight: "50px", */
    },

/*     addNewButton: {
      height: '6rem',
      width: '6rem',
      fontSize: '0.7rem',
      fontWeight: 'bold',
      borderRadius: '50%',
      border: '2px solid #ff8d58',
      color: '#ff8d58',
      textAlign: 'center',
      textDecoration: 'none',
  },

    titleLink: {
      color: colours.gray,
      fontSize: "1rem",
      textTransform: "uppercase",
      fontWeight: "bold",
      marginTop: "0.5em",
      textDecoration: "underline",
    },

    headerSeparator: {
      color: colours.gray,
      fontSize: "2rem",
      margin: "0 0.2em",
    },
/*
    headerTitle: {
      fontSize: "3rem",
      fontWeight: "normal",
      whiteSpace: "nowrap",
    }, */

  // BOARD STYLES
  boardHeader: {
    width: "100%",
    fontFamily: font,
    marginBottom: 20,
  },

  addColumn: {
    minWidth: 250,
  },

  columnRow: {
    flexWrap: "nowrap",
  },

  // COLUMN STYLES
  column: {
    backgroundColor: colours.lightergrey,
    minHeight:200,
    width: 335,
  },

  columnIsDragging: {
    backgroundColor: colours.lightergrey,
    width: 335,
    minHeight:1,
    WebkitBoxShadow:"0 2px 5px 0px rgb(255 105 135 / 40%)",
    MozBoxShadow:"0 2px 5px 0px rgb(255 105 135 / 40%)",
    boxShadow:"0 2px 5px 0px rgb(255 105 135 / 40%)",
  },

  columnHeader: {
    flexWrap: "nowrap",
    marginTop: 10,
  },

  columnName: {
    fontFamily: font,
    fontWeight: "lighter",
  },

  columnButtonGrid: {
    width: 150,
  },

  columnButtonIcons: {
    fontSize: 22,
    color: "#949494",
  },

  columnButton: {
    minWidth: 30,
  },

  dropDownColumn: {
    width: 18,
  },

  ticketList: {
    backgroundColor: colours.lightergrey,
    transitionProperty: "background-color",
    transitionDuration: "0.5s",
    transitionTimingFunction: "ease",
  },

  ticketListDraggingOver: {
    backgroundColor: colours.darkergrey,
  },

  // TASK STYLES
  task: {
    minHeight: 115,
    borderRadius: 4,
    backgroundColor: colours.white,
    width: 320,
  },

  taskIsDragging: {
    minHeight: 115,
    borderRadius: 4,
    backgroundColor: colours.white,
    width: 320,
    WebkitBoxShadow:"0 3px 5px 0px rgb(255 105 135 / 30%)",
    MozBoxShadow:"0 3px 5px 0px rgb(255 105 135 / 30%)",
    boxShadow:"0 3px 5px 0px rgb(255 105 135 / 30%)",
  },

  taskButtonIcons: {
    fontSize: 22,
    color: colours.white,
  },

  taskDropdownButton: {
    minWidth: 30,
  },

  taskHeader: {
    background: colours.black,
    flexWrap: "nowrap",
    color: colours.white,
    height: 30,
    transitionProperty: "background-color",
    transitionDuration: "0.5s",
    transitionTimingFunction: "ease",
  },

  taskHeaderIsDragging: {
    background: colours.darkestgrey,
    flexWrap: "nowrap",
    color: colours.white,
    height: 30,
  },

  taskTitle: {
    color: colours.white,
    fontSize: 12,
    marginLeft: 5,
    fontFamily: font,
    width: "40%",
  },

  taskStoryPoints: {
    color: colours.white,
    fontSize: 12,
    marginLeft: 5,
    fontFamily: font,
    justify:"flex-end",
  },

  subTaskStoryPoints: {
    color: colours.black,
    fontSize: 12,
    marginLeft: 5,
    fontFamily: font,
    justify:"flex-end",
  },

  taskName: {
    fontSize: 18,
    marginTop: 5,
    marginLeft: 5,
    fontFamily: font,
  },

  ticketColorPillsGrid: {
    marginLeft: 1.5,
  },

  colorPill: {
    borderRadius: 20,
    height: 13,
    width: 46,
  },
  /*
  colorSquare: {
    width: 50,
    height: 50,
    backgroundColor: colours.red,
  },
*/
  ticketDivider: {
    marginLeft: -4,
    marginRight: -3,
  },

  memberCircle: {
    borderRadius: 100,
    height: 32,
    width: 32,
    textAlign: "center",
    backgroundColor: colours.lightgrey,
    fontFamily: font,
  },

  deletedMemberCircle: {
    borderRadius: 100,
    height: 32,
    width: 32,
    textAlign: "center",
    backgroundColor: colours.red,
    color: colours.white,
    fontFamily: font,
  },

  // SUBTASK STYLES
  subtaskComponent: {
    backgroundColor: "#fff",
    minHeight: 115,
    width: 320,
  },

  subtaskHeader: {
    backgroundColor: colours.lightgrey,
    flexWrap: "nowrap",
    height: 33,
  },

  subtaskTaskPrettyId: {
    fontSize: 14,
    marginLeft: 5,
    fontFamily: font,
    width:"40%"
  },

  subtaskDropdownGrid: {
    height: 30,
    minWidth: 30,
  },

  subtaskPrettyId: {
    color: "#949494",
    fontFamily: font,
    marginLeft: 5,
    marginTop: 5,
  },

  subtaskName: {
    fontSize: 18,
    marginLeft: 5,
    fontFamily: font,
  },

  subtaskButtonIcons: {
    fontSize: 22,
  },

  subtaskDropdownButton: {
    minWidth: 30,
  },

  subtaskContentAndName: {
    maxWidth: 300,
  },

  subtaskContentAndNameText: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },

  subtaskDropDownIcon: {
    minWidth: 30,
  },

  // DIALOG STYLES
  dialogFocus: {
    minWidth: "100vw",
    maxWidth: "100vw",
    borderRadius: 10,
    boxShadow:
      "0  9px 46px  8px rgba(0, 0, 0, 0.14),0 11px 15px -7px rgba(0, 0, 0, 0.12),0 24px 38px  3px rgba(0, 0, 0, 0.20)",
    minHeight: "100vh",
    maxHeight: "100vh",
  },

  dialogUnfocus: {
    minWidth: "100vw",
    maxWidth: "100vw",
    minHeight: "100vh",
    maxHeight: "100vh",
  },

  dialogPaper: {
    minHeight: "80vh",
    maxHeight: "80vh",
  },

  // ALERT BOX STYLES
  undoAlertButton: {
    margin: 5,
  },

  deleteAlertButton: {
    margin: 5,
  },

  archiveAlertButton: {
    margin: 5,
  },

  alertCheckbox: {
    color: colours.white,
    "&$checked": {
      color: colours.white,
    },
  },
});

export const swimlaneStyles = makeStyles({
  swimlaneAddButtonGrid: {
    width: "100%",
  },

  swimlaneToggleSwimlanesButtonGrid: {
    width: "100%",
  },

  swimlaneAddTaskButton: {
    color: colours.blue,
  //  marginLeft: 5,
    fontFamily: font,
    fontSize: 14,
  },

  swimlaneHideButton: {
    color: colours.blue,
    fontFamily: font,
    fontSize: 14,
  },

  swimlaneShowButton: {
    color: colours.blue,
  //  marginRight: 5,
    fontFamily: font,
    fontSize: 14,
  },

  swimlaneColumnNames: {
    flexWrap: "nowrap",
    backgroundColor: colours.lightergrey,
  },

  swimlaneColumnGrid: {
    width: 350,
    fontFamily: font,
    fontWeight: 600,
    height: 50,
  },

  swimlaneColumnNameGrid: {
    width: "99%",
  },

  swimlaneColumnName: {
    paddingLeft: 15,
  },

  swimlaneNumberOfTasks: {
    paddingRight: 20,
  },

  swimlaneColumnDivider: {
    width: "1%",
  },

  swimlane: {
    backgroundColor: colours.lightergrey,
    minWidth: 500,
    marginBottom: 14,
  },

  swimlaneHeaderRow: {
    height: 60,
  },

  swimlaneHeaderRowLeft: {
    width: "80%",
    marginLeft: 5,
    alignItems: "center",
  },

  swimlaneHeaderRowRight: {
    width: "20%",
    marginRight: 0,
    alignItems: "center",
  },

  subtaskText: {
    fontFamily: font,
  },

  progressBarRoot: {
    height: 8,
  },

  progressBarBackground: {
    backgroundColor: colours.lightgrey,
  },

  progressBarColor: {
    backgroundColor: colours.black,
  },

  swimlaneColumnList: {
    width: "100%",
    flexWrap: "nowrap",
  },

  swimlaneColumn: {
    width: 327,
    flexWrap: "nowrap",
  },

  swimlanePrettyId: {
    color: colours.blue,
    fontFamily: font,
  },

  swimlaneTitle: {
    fontFamily: font,
    fontWeight: 500,
  },

  swimlaneNumberOfSubtasks: {
    fontFamily: font,
  },
});
