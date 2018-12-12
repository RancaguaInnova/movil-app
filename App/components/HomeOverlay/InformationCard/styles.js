const container = {
  main: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    /* borderWidth: 1,
          borderColor: 'red', */
  },
  indicator: {
    width: '30%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 0,
    /* borderColor: 'blue',
        borderWidth: 1, */
  },
  detail: {
    width: '70%',
    paddingTop: 10 /*  borderWidth: 1, borderColor: 'yellow' */,
  },
}

const text = {
  indicatorTitle: {
    fontSize: 28,
    paddingTop: 15,
    /* borderWidth: 1,
              borderColor: 'yellow', */
  },
  detailTitle: {
    color: 'white',
  },
  detailSubtitle: { fontSize: 10 },
}

const icon = {
  indicator: {
    paddingLeft: 37,
  },
}

export { container, text, icon }
