#ifndef UTILS_G
#define UTILS_G

const URL = window.location.href;

const repeatUntilSuccess = fn => {
  const interval = setInterval(() => {
    try {
      fn();
      clearInterval(interval);
    }
    catch (e) {
      return;
    }
  }, 50)
};

#endif
