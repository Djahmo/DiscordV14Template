const formatDateFrançaise = (timestamp = Date.now()) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  
  const getNow = () => {
    const now = new Date();
  
    const formattedTime = now.toLocaleDateString('fr-FR', {
        timeZone: 'Europe/Paris',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }) + ' à ' + now.toLocaleTimeString('fr-FR', {
        timeZone: 'Europe/Paris',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).replace(':', 'h');
  
    return formattedTime;
  };
  
  const cleanNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
  
  module.exports = {
      formatDateFrançaise,
      delay,
      getNow,
      cleanNumber
  }