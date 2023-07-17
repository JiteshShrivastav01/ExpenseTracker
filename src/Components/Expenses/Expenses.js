import { useRef, useContext, useEffect , useState, useCallback} from 'react'
import classes from './Expenses.module.css'
import AuthContext from '../Context/AuthContext'


const AddExpenses=()=>{
    const [expenses,setExpenses]=useState([])
    const ctx=useContext(AuthContext)
    const Name=useRef()
    const Description = useRef()
    const Price=useRef()
    const UserEmail=ctx.email && ctx.email.replace(/[@,.]/g,'')

    const SubmitHandler=useCallback(async (e)=>{
        e.preventDefault()
        console.log(UserEmail ,'Email')
        const expenseName = Name.current.value
        const expenseDescription = Description.current.value
        const expensePrice = Price.current.value 

        try{
           const res=await fetch(`https://expensetracker-a6562-default-rtdb.firebaseio.com/Users/${UserEmail}/Expenses.json` ,{
            method:'POST',
            body:JSON.stringify({
                ExpenseName : expenseName,
                ExpenseDescription : expenseDescription,
                ExpensePrice : expensePrice
            }),
            headers:{
               'Content-Type' : 'application/json'
            }
           })
           const data = await res.json()
           console.log(data)
        }
        catch(err){
            alert(err)
        }
        Name.current.value=''
        Description.current.value=''
        Price.current.value=''
    })

    const removeExpense=async (expense)=>{
        try{
            await fetch(`https://expensetracker-a6562-default-rtdb.firebaseio.com/Users/${UserEmail}/Expenses/${expense.id}.json` ,{
               method:'DELETE'
            })
        }
        catch(err){
            alert(err)
        }
    }
    
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const editExpense=async (expense)=>{
        Name.current.value=expense.ExpenseName
        Description.current.value=expense.ExpenseDescription
        Price.current.value=expense.ExpensePrice

        await delay(6000)

        try{
            const updatedExpense={
                ...expense,
                ExpenseName : Name.current.value,
                ExpenseDescription :Description.current.value,
                ExpensePrice : Price.current.value 
            }
            console.log(updatedExpense)
            const res=await fetch(`https://expensetracker-a6562-default-rtdb.firebaseio.com/Users/${UserEmail}/Expenses/${expense.id}.json` ,{
               method:'PUT',
               body:JSON.stringify(updatedExpense),
               headers:{
                'Content-Type':'application/json'
               }
            })
            const data=await res.json()
            console.log(data)
        }
        catch(err){
            alert(err)
        }
    }

    useEffect(()=>{
        async function ShowExpenses(){
            try{
               const res=await fetch(`https://expensetracker-a6562-default-rtdb.firebaseio.com/Users/${UserEmail}/Expenses.json`)
               const data=await res.json()
               console.log(data)

               const loader=[]
               for(let key in data){
                loader.push({
                    id : key ,
                    ExpenseName : data[key].ExpenseName,
                    ExpenseDescription : data[key].ExpenseDescription ,
                    ExpensePrice : data[key].ExpensePrice
                })
               }
               setExpenses(loader)
            }
            catch(err){
                alert(err)
            }
        }
        ShowExpenses()
    },[UserEmail,SubmitHandler,removeExpense,editExpense])


    return(
      <div>
        <div className={classes.container}>
         <form className={classes.form} onSubmit={SubmitHandler}>
            <select name="Expenses" className={classes.select} placeholder='Select Expense' ref={Name}>
                <option value="Food">Food</option>
                <option value="Petrol">Petrol</option>
                <option value="Hotel">Hotel</option>
            </select>
            <input type="text" placeholder='Expense Description' ref={Description} className={classes.input}/>
            <input type="number" placeholder='Price' ref={Price} className={classes.input}/>
            <button type="submit" className={classes.button}>Add Expenses</button>
         </form>

         <hr />
        </div>
        <hr />
        <div className={classes.showExpenses}>
           <ul>
           {expenses.map(expense=>(
            <li className={classes.list}>
                <p>{expense.ExpenseName}</p>
                <p>{expense.ExpenseDescription}</p>
                <p>{expense.ExpensePrice}</p>
                <button className={classes.removeBtn} onClick={()=>removeExpense(expense)}>Remove</button>
                <button className={classes.editBtn} onClick={()=>editExpense(expense)}>Edit</button>
            </li>
          ))}
          </ul>
        </div>
      </div>
    )
}

export default AddExpenses