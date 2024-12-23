from datetime import datetime
import sys
import os
import re
import gzip

# Returns a list of log files in the given directory
def get_log_files(log_dir, log_prefix):
  log_files = []
  for file in os.listdir(log_dir):
    full_path = os.path.join(log_dir, file)
    if os.path.isfile(full_path) and file.startswith(log_prefix):
      log_files.append(full_path)
      log_files.sort()
  return log_files

# Returns a datetime object from a string with the given format
def parse_time_from_string(time_string, time_format):
  match = re.match(r"^(\S+ \S+ \S+)", time_string)
  if match:
      return datetime.strptime(match.group(1), time_format)
  return None

# Returns a list of strings representing log lines
def filter_logs(file_name, start_time_str, end_time_str, time_format):
  log_lines = []
  open_func = gzip.open if file_name.endswith(".gz") else open
  with open_func(file_name, "rt", encoding="utf-8", errors="ignore") as f:
    for line in f:
      log_time = parse_time_from_string(line, time_format)
      start_time = datetime.strptime(start_time_str, time_format)
      end_time = datetime.strptime(end_time_str, time_format)
      if log_time and start_time <= log_time <= end_time:
        log_lines.append(line)
  return log_lines

# Returns a list of log lines from the given log files within the given time range
def fetch_logs(log_files, start_time_str, end_time_str, time_format):
  logs = []
  for file in log_files:
    logs.extend(filter_logs(file, start_time_str, end_time_str, time_format))
  return logs

# Write log array to file
def write_logs_to_file(logs, file_name):
  with open(file_name, "w") as f:
    for log in logs:
      f.write(log)

def compress_file(file_name):
  with open(file_name, 'rb') as f_in:
    with gzip.open(file_name + '.gz', 'wb') as f_out:
      f_out.writelines(f_in)

if __name__ == '__main__':
  # Main configuration - modify as needed
  log_dir = "/var/log"
  log_prefix = "syslog"
  time_format = "%b %d %H:%M:%S"
  start_time = " ".join(sys.argv[1].split("_")) if len(sys.argv) > 1 else "Dec 20 00:00:00"
  end_time = " ".join(sys.argv[2].split("_")) if len(sys.argv) > 2 else "Dec 20 12:00:00"
  start_time_stripped = start_time.replace(":", "_").replace(" ", "-")
  end_time_stripped = end_time.replace(":", "_").replace(" ", "-")
  file_name_out = f"{log_prefix}_{start_time_stripped}_{end_time_stripped}"

  log_files = get_log_files(log_dir, log_prefix)
  print(log_files)

  logs = fetch_logs(log_files, start_time, end_time, time_format)
  # print(logs)

  write_logs_to_file(logs, f"/tmp/{file_name_out}")
  compress_file(f"/tmp/{file_name_out}")
  print(f"/tmp/{file_name_out}.gz")
