import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  fetchTranactionBySearchTextAction,
  clearTransactionBySearchTextAction} from '../redux/actions/report-action';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AutoSearchText = (props ) => {

    // dispatch
    const dispatch = useDispatch();

    const [suggestions, setSuggestions] = useState([]);
    const [suggestionIndex, setSuggestionIndex] = useState(0);
    const [suggestionsActive, setSuggestionsActive] = useState(false);
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);

    const allFilteredResults = useSelector(
      state => state.reports.filteredByTextSearch,
    );

    const handleChange = (text) => {
    
      const query = text.toUpperCase();
      setValue(query);
      console.log("qr-->"+query);
      //if (query.trim().length > 0) {
      if (query != '') {
        console.log("qr2"+query);
        dispatch(fetchTranactionBySearchTextAction(query));
        const result = [];
      
        const resultFiltered = allFilteredResults
        .filter(item => item.partyName.includes(query))
        .map((item,index) => (
          item.partyName,
          result.push({
            partyCode:item.partyCode,
            partyName: item.partyName
          })
        ));
        // if(result)
        // {
          const suggestions = [...new Map(result.map(item =>
            [item['partyCode'], item])).values()];
        //}
        //console.log("first word"+query)
        
        //console.log("res"+ JSON.stringify(suggestions));
        setSuggestions(suggestions);
        setLoading(false);
        setSuggestionsActive(true);
        } else {
          setValue('');
          console.log("0")
          setSuggestionsActive(false);
          //dispatch(clearTransactionBySearchTextAction());
          //props.goToTransactionReportClearHandler();
        }
      };
     
      const handleClick = (val) => {
        setSuggestions([]);
        setValue(val.partyName);
        setSuggestionsActive(false);
        props.goToTransactionReportHandler(val.partyCode);
      };
      const onClear = () => {
        setValue('');
       // setSuggestions([]);
       
        setSuggestionsActive(false);
        dispatch(clearTransactionBySearchTextAction());
        props.goToTransactionReportClearHandler();
    };
      const handleKeyDown = (e) => {
       console.log('keydn->'+e.keyCode)
        // UP ARROW
        if (e.keyCode === 38) {
          if (suggestionIndex === 0) {
            return;
          }
          setSuggestionIndex(suggestionIndex - 1);
        }
        // DOWN ARROW
        else if (e.keyCode === 40) {
          if (suggestionIndex - 1 === suggestions.length) {
            return;
          }
          setSuggestionIndex(suggestionIndex + 1);
        }
        // back space
        else if (e.keyCode === 'Backspace') {
          console.log("dddd"+e.keyCode)
        }
        // ENTER
        else if (e.keyCode === 13) {
          setValue(suggestions[suggestionIndex]);
          setSuggestionIndex(0);
          setSuggestionsActive(false);
        }
      };
    
      const Suggestions = () => {
        return (
          <View style={styles.suggestions}>
            {suggestions.map((suggestion, index) => {
              
              return (
                <View style={styles.containerList}>
                <TouchableOpacity style={styles.suggestionList} key={suggestion.partyCode} onPress={() => handleClick(suggestion)}>
                <Text style={styles.label}>
                  {suggestion.partyName}
                </Text>
                </TouchableOpacity>
                </View>
              );
            })}
          </View>
         
        );
      };
    
    return (
        <SafeAreaView>
          <View style={styles.centerDiv}>
            <View style={styles.autocomplete}>
              <TextInput
              onKeyPress={handleKeyDown}
              onChangeText={(text) => { handleChange(text)}}
              value={value}
              placeholder= 'Search - Party Name'
              style={styles.input}
              autoCapitalize = {"characters"}
              />
              <TouchableHighlight onPress={() => {onClear()}} >
                <MaterialIcons name="close" style={styles.Icon} size={25} color="grey" />
              </TouchableHighlight>
             
            </View>
            <View style={styles.autocompleteList}>
            {suggestionsActive && <Suggestions />}
            </View>
          </View>
        </SafeAreaView>
    )
}

export default AutoSearchText;
const styles = StyleSheet.create({
  centerDiv :{
  textAlign: 'left',
  width:'100%',
},
suggestions :{
  margin: 0,
  padding : 0,
  textAlign : 'center',
  justifyContent: 'center',
  justifySelf: 'center',
  border: 2,
  borderRadius: 5,
  overflow: 'hidden',
  width:'100%',
},
suggestionList:{
  borderBottom: 1,
  fontWeight: 'bold',
  textTransform: 'uppercase',
  cursor: 'pointer',
  borderBottomColor: 'lightgrey',
  width:320,
  marginLeft:5,
},
label:{
  borderBottomColor: 'grey',
    borderBottomWidth: 1,
    textAlign:'left',
    paddingLeft: 15,
    padding:7,
    width:'100%',
    backgroundColor:'#fff',
    shadowColor:'#52006A',
    borderBottomColor:'lightgrey',
    textTransform:'uppercase',
    fontWeight:'bold',
    fontSize: 18,
    textTransform:'uppercase',
  },
  input:{
    borderRadius: 10,
    borderWidth: 1,
    boderColor: '#000',
    width: 320,
    padding: 10,
    color: '#000',
    paddingLeft: 18,
    backgroundColor: '#ececec',
    textDecorationStyle:'none',
    fontWeight:'bold',
    fontSize: 18,
    textTransform:'uppercase',
  },
  Icon:{
    display:'flex',
    marginLeft: 2,
    marginRight: 2,
    paddingTop: 5,
  },
  autocomplete:{
    flexDirection:'row',
    marginLeft:5,
    marginRight: 5,
  },
});
