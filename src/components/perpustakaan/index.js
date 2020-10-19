import React, { Component } from 'react';
import { ScrollView, View, Text, ActivityIndicator, CheckBox, TouchableOpacity, StyleSheet, Image, Dimensions, InteractionManager } from 'react-native';
import { withTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import { fetchCategory } from './../../actions';
import ListMenu from './const/ListMenu';
import CollapseMenu from './const/CollapseMenu';
import CollapseItem from './const/CollapseItem';

const screenHeight = Dimensions.get('window').height;

class Katalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      defaulty: 1,
      active: true,
      show: false,
      expandable: false
    };
  }
  componentDidMount(){
    this.props.getCategories();
  } 
  onChange = (id) => {
    this.setState({
      defaulty: id
    })
  }
  goToPress = () => {
    console.log('goToPress')
  }
  goToCollapse = (id) => {
    console.log(id)
    const { collapse, expandable } = this.state;
    this.setState({
      collapse: id,
    })
    if(id == collapse){
      this.setState({expandable: !expandable})
    } 
  }
  render() {
    const { active, defaulty, collapse, expandable } = this.state;
    const { categories, loading, navigation } = this.props;
    if(loading == false){
      <ActivityIndicator size="large" color="#0000ff" />
    }
    return(
      <View flexDirection='row' style={{backgroundColor: '#ffffff'}}>
        <ScrollView
          style={{width: '25%', backgroundColor: '#F4F4F4', height: screenHeight}}
          showsVerticalScrollIndicator={false}
        >
          {
            categories.length != 0 && 
            categories.map((category, i) => {
              return  <ListMenu 
                        key={category.id} 
                        name={category.category_name} 
                        active={category.id==defaulty ? active : !active} 
                        id={i} 
                        onChange={() => this.onChange(category.id)}
                      />
            })
          }
        </ScrollView>
        
        <ScrollView 
          showsVerticalScrollIndicator={false}
          style={{width: '75%', height: screenHeight}}
        >
          {
            categories.map(({id, children_recursive}, i) => (
              <View key={id} flexDirection="column" style={id == defaulty ? styles.dBlock : styles.dNone}>
                  {
                    children_recursive.map(({id, category_name, children_recursive}, x) => (
                      <View key={id}>
                        <CollapseMenu
                          goToPress={() => navigation.navigate('Kategori', {id: id, title:category_name})} 
                          goToCollapse={() => this.goToCollapse(id)}
                          titleMenu = {category_name}
                        />
                        <View flexDirection="row" style={id == collapse && expandable ? styles.collapse : styles.expand}>
                          {
                            children_recursive.map((item, y) => (
                              <CollapseItem
                                key = {item.id}
                                onPress = {() => navigation.navigate('Kategori', {id: item.id, title:item.category_name})} 
                                titleItem = {item.category_name}
                              />
                            ))
                          }
                        </View>
                        <View
                          style = {{
                            borderBottomColor: '#e4e6e8',
                            borderBottomWidth: 1,
                          }}
                        />
                      </View>
                    ))
                  }
              </View>
            ))
          }

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        paddingVertical: 15,
        alignItems: 'center'
    },
    containerActive:{
        paddingVertical: 15,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    iconImage:{
        width: 30,
        height: 30,
    },
    katalogMain:{
        fontSize:10,
        marginLeft: 0
    },
    dataText:{
        textAlign: 'center',
    },
    dNone: {
      display: "none"
    },
    dBlock: {
      display: 'flex'
    },
    expand: {
      flexWrap:'wrap', 
      height: 0, 
      opacity: 0
    },
    collapse: {
      flexWrap:'wrap', 
    }
});
function mapStateToProps(state) {
  return {
    categories: state.categories.items,
    loading: state.categories.isFetching
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => dispatch(fetchCategory())
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Katalog));
