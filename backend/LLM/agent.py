from google.adk.agents.llm_agent import Agent
from .custom_agent_wrapper_function import build_agent

check_agent = build_agent()

root_agent = build_agent(llm="ollama/gemma3:12b",
                         name="manager",
                         desc="mudar depois",
                         instr_file_path="agent_instructions/root.txt",
                         tools=[],
                         subagents=[check_agent])